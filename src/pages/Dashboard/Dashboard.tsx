import styled from "styled-components";

import useStudentContext from "@/context/studentContext";

import Achievements from "./components/Achievements";
import LearningProgress from "./components/LearningProgress";
import LastModuleInfo from "./components/Info/LastModuleInfo";
import RankInfo from "./components/Info/RankInfo";
import LevelInfo from "./components/Info/LevelInfo";
import PointInfo from "./components/Info/PointInfo";
import { useUpdateStudentSubscription } from "@/api/student/subscription";

function DashboardPage() {
    useUpdateStudentSubscription();

    const { student } = useStudentContext();

    if (!student) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1 className="text-h2-semibold text-stroke-600 mb-5">Dashboard</h1>

            <div className="grid grid-cols-10 grid-rows-7 gap-5">
                <div className="col-span-4 row-span-2 bg-highlight-300 rounded-sm flex flex-col px-8 py-6">
                    <LastModuleInfo courseName="JavaScript Fundamental" lastAccessed="2 days ago" address="/" />
                </div>

                <div className="relative col-span-4 row-span-2 bg-stroke-900 rounded-sm flex items-center pl-10 gap-8 overflow-hidden">
                    <RankInfo rank={student.rank} />
                </div>

                <div className="col-span-2 col-start-9 row-span-1 bg-secondary rounded-sm flex items-center gap-4 px-4">
                    <LevelInfo level={student.level} />
                </div>

                <div className="col-span-2 col-start-9 row-span-1 bg-tertiary-500 rounded-sm flex items-center gap-4 px-4">
                    <PointInfo points={student.points} />
                </div>

                <WhiteCard className="col-span-6 col-start-1 row-span-5">
                    <LearningProgress />
                </WhiteCard>
                <WhiteCard className="col-span-4 row-span-5">
                    <Achievements />
                </WhiteCard>
            </div>
        </>
    );
}

const WhiteCard = styled.div`
    background-color: #fffffe;
    border-radius: 10px;
    padding: 1.5rem 2rem;

    box-shadow: 1px 0px 10px -4px rgba(0, 0, 0, 0.25);
`;

export default DashboardPage;
