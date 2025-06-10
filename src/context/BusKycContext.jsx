import React, { createContext, useContext, useState, useEffect } from "react";

const BusKYCContext = createContext();
export const useBusKYC = () => useContext(BusKYCContext);


const LOCAL_STORAGE_KEY = "gpay_kyc_state";

const defaultSteps = {
  BusIndIdentify: false,
  BusIndIdentify2: false,
  BusIndIdentify3: false,
  BusIndIdentify4: false,
  BusIndIdentify5: false,
  BusIndIdentify6: false,
};

const defaultData = {
  step1: {},
  step2: {},
  step3: {},
  step4: {},
  step5: {},
};

const stepOrder = [
  "BusIndIdentify",
  "BusIndIdentify2",
  "BusIndIdentify3",
  "BusIndIdentify4",
  "BusIndIdentify5",
  "BusIndIdentify6",
];

export const BusKYCProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // NEW

  const [kycState, setKycState] = useState({
    status: "not_started",
    steps: defaultSteps,
    data: defaultData,
    rejectionReason: "",
  });

  const [currentStepBusIndex, setCurrentStepBusIndex] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        const res = await fetch(`${API_BASE_URL}/api/kyc/bus/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userAuthToken")}`,
          },
        });

        if (res.status === 401) {
          console.warn("Unauthorized - token expired");
          return setKycState((prev) => ({
            ...prev,
            status: "unauthorized",
          }));
        }

        if (!res.ok) throw new Error(`Failed to fetch status: ${res.status}`);

        const data = await res.json();

        const allowedStatuses = [
          "not_started",
          "in_progress",
          "in_review",
          "approved",
          "rejected",
        ];

        const validStatus = allowedStatuses.includes(data.status)
          ? data.status
          : "not_started";

        setKycState((prev) => ({
          ...prev,
          status: validStatus,
          steps: data.steps || prev.steps,
          data: data.data || prev.data,
          rejectionReason: data.rejectionReason || "",
        }));
      } catch (err) {
        console.error("Error fetching KYC status:", err);
      }finally {
        setIsLoading(false); // <-- stop loading no matter what
      }
    };

    fetchStatus();
  }, []);

//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(kycState));
//   }, [kycState]);

useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(kycState));
    }, 300);
  
    return () => clearTimeout(timeout);
  }, [kycState]);
  
  const startKyc = () => {
    setKycState({
      status: "in_progress",
      steps: defaultSteps,
      data: defaultData,
      rejectionReason: "",
    });
    setCurrentStepBusIndex(0);
  };

  const goToStep = (stepNumber) => {
    if (stepNumber < 1 || stepNumber > stepOrder.length) return;
    setCurrentStepBusIndex(stepNumber - 1);
  };

  const markStepComplete = (stepName) => {
    setKycState((prev) => {
      const updatedSteps = { ...prev.steps, [stepName]: true };
      const allStepsDone = Object.values(updatedSteps).every(Boolean);
      const newStatus = allStepsDone ? "in_review" : "in_progress";

      return {
        ...prev,
        steps: updatedSteps,
        status: newStatus,
      };
    });

    if (stepName !== "BusIndIdentify6") {
      setCurrentStepBusIndex((prevBusIndex) =>
        Math.min(prevBusIndex + 1, stepOrder.length - 1)
      );
    }
  };

  const updateStepData = (stepKey, data) => {
    setKycState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [stepKey]: data,
      },
    }));
  };

  return (
    <BusKYCContext.Provider
      value={{
        kycStatus: kycState.status,
        currentStep: currentStepBusIndex + 1,
        currentStepKey: stepOrder[currentStepBusIndex],
        kycSteps: kycState.steps,
        kycData: kycState.data,
        startKyc,
        markStepComplete,
        updateStepData,
        goToStep,
        isKycLoading: isLoading,
        kycRejectionReason: kycState.rejectionReason,
      }}
    >
      {children}
    </BusKYCContext.Provider>
  );
};
