import SubAccount from "./SubAccount";

function SideBar() {
    return (
        <>
            <div className="SideBar_container">
                <div className="SideBar_myaccount">
                    <div className="SideBar_avatar">
                        <img src="https://res.cloudinary.com/doapkbncj/image/upload/v1662995943/onstagram/mgmfgkcjd0upqhhkx4cz.jpg" />
                    </div>
                    <div className="SideBar_infor_account">
                        <a>hc_nguyen_cuong</a>
                        <p className="m-0">Cường Nguyễn Huy</p>
                    </div>
                    <div className="SideBar_switch_acc">
                        <a>Switch</a>
                    </div>
                </div>

                <div className="SideBar_suggestion_label">
                    <p className="m-0">Suggestions for you</p>
                    <div className="SideBar_switch_acc">
                        <a>See all</a>
                    </div>
                </div>

                <div>
                    <SubAccount />
                    <SubAccount />
                    <SubAccount />
                    <SubAccount />
                    <SubAccount />
                </div>
            </div>
        </>
    );
}

export default SideBar;
