import { BsLightningCharge } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { SlScreenDesktop } from "react-icons/sl";
import { TbLogout2 } from "react-icons/tb";

import styled from "styled-components";

function DashboardSideBar() {
    return (
        <SideBarContainer className="bg-tertiary-500">
            <h1 className="text-h4-extrabold">JStudy.</h1>
            <SideBarItemsContainer>
                <ul>
                    <li className="active bg-secondary">
                        <SlScreenDesktop size={28} /> Dashboard
                    </li>
                    <li>
                        <IoBookOutline size={28} /> Courses
                    </li>
                    <li>
                        <BsLightningCharge size={28} /> Daily Challenge
                    </li>
                    <li>
                        <FaRegStar size={28} /> Achievements
                    </li>
                    <li className="flex-1 items-end mb-11">
                        <TbLogout2 size={28} /> Logout
                    </li>
                </ul>
            </SideBarItemsContainer>
        </SideBarContainer>
    );
}

const SideBarContainer = styled.div`
    width: 22rem;
    display: flex;
    flex-direction: column;
    max-height: 100vh;

    padding-top: 50px;
    padding-left: 35px;

    position: sticky;
`;

const SideBarItemsContainer = styled.div`
    display: flex;
    flex: 1;
    margin-top: 60px;

    & > ul {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding-right: 10px;

        & > li {
            display: flex;
            gap: 10px;

            border-radius: 10px;
            cursor: pointer;

            margin-top: 25px;
            padding: 15px 0px 15px 15px;
        }
    }
`;

export default DashboardSideBar;
