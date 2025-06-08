import style from "../styles/footer.module.css"

function Footer() {
    return (
        <div>
            <div className={style.footer}>
            <div className={style.foot1}>
                <p>Showing</p>
                <select name="" id="">
                    <option value="">30</option>
                </select>
            </div>

            <p>Showing 1 of 10 of 50 records</p>

            <div className={style.foot2}>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>

            </div>
          </div>
        </div>
    )
}

export default Footer
