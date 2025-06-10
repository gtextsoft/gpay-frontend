import React, { createContext, useContext, useState, useEffect } from "react";

const KYCContext = createContext();
export const useKYC = () => useContext(KYCContext);


const LOCAL_STORAGE_KEY = "gpay_kyc_state";

const defaultSteps = {
  IndIdentify: false,
  IndIdentify2: false,
  IndIdentify3: false,
  IndIdentify4: false,
  IndIdentify5: false,
  IndIdentify6: false,
  IndIdentify7: false,
};

const defaultData = {
  step1: {},
  step2: {},
  step3: {},
  step4: {},
  step5: {},
  step6: {},
};

const stepOrder = [
  "IndIdentify",
  "IndIdentify2",
  "IndIdentify3",
  "IndIdentify4",
  "IndIdentify5",
  "IndIdentify6",
  "IndIdentify7",
];

export const KYCProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // NEW

  const [kycState, setKycState] = useState({
    status: "not_started",
    steps: defaultSteps,
    data: defaultData,
    rejectionReason: "",
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        const res = await fetch(`${API_BASE_URL}/api/kyc/status`, {
          headers: {
            Authorization: `Bearer ${ 
              localStorage.getItem("userAuthToken") || // individual
              localStorage.getItem("businessAuthToken")}`,
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

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(kycState));
  }, [kycState]);

  const startKyc = () => {
    setKycState({
      status: "in_progress",
      steps: defaultSteps,
      data: defaultData,
      rejectionReason: "",
    });
    setCurrentStepIndex(0);
  };

  const goToStep = (stepNumber) => {
    if (stepNumber < 1 || stepNumber > stepOrder.length) return;
    setCurrentStepIndex(stepNumber - 1);
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

    if (stepName !== "IndIdentify7") {
      setCurrentStepIndex((prevIndex) =>
        Math.min(prevIndex + 1, stepOrder.length - 1)
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
    <KYCContext.Provider
      value={{
        kycStatus: kycState.status,
        currentStep: currentStepIndex + 1,
        currentStepKey: stepOrder[currentStepIndex],
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
    </KYCContext.Provider>
  );
};
