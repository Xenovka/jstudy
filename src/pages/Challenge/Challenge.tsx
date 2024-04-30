import { LegacyRef, useRef } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useForm } from "react-hook-form";

import { FaRankingStar } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { FiClock } from "react-icons/fi";

import ChallengeConfirmModal from "./components/ChallengeConfirmModal";
import ChallengeInputAnswer from "./components/ChallengeInputAnswer";
import ChallengeQuestion from "./components/ChallengeQuestion";
import ChallengeLeaveModal from "./components/ChallengeLeaveModal";
import ModalFinish from "./components/ModalFinish";

import { useUpdateStudentSubscription } from "@/api/student/subscription";

import { useChallenge } from "./hooks/useChallenge";

import { ChallengeInputs } from "@/types/challenge";
import { useBlocker } from "react-router-dom";

function ChallengePage() {
    useUpdateStudentSubscription();

    const { handleSubmit, control } = useForm<ChallengeInputs>();

    const {
        challenge,
        isModalOpened,
        isStudentFailed,
        isStudentCompleted,
        handleSubmitAnswer,
        setDuration,
        duration,
        navigate,
        updateFailedStudent
    } = useChallenge();

    const isCompleted = isStudentCompleted();
    const isFailed = isStudentFailed();

    const countdownRef = useRef<Countdown>();
    const handleStart = () => countdownRef?.current?.start();
    const handlePause = () => countdownRef?.current?.pause();

    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
        if (currentLocation.pathname !== nextLocation.pathname) {
            handlePause();
        }

        return currentLocation.pathname !== nextLocation.pathname;
    });

    const handleFailed = () => {
        if (blocker.state === "blocked") {
            updateFailedStudent();
            blocker.proceed();
        }
    };

    const handleResume = () => {
        if (blocker.state === "blocked") {
            handleStart();
            blocker.reset();
        }
    };

    const handleExitFailedChallenge = () => {
        navigate("/dashboard");

        handleFailed();
    };

    const handleCloseModal = () => {
        navigate("/dashboard");

        if (blocker.state === "blocked") {
            blocker.proceed();
        }
    };

    const renderer = ({ minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            return (
                <>
                    <p className="text-h6-bold">Finished!</p>
                    <ModalFinish
                        headerText="Time is up!"
                        descriptionText="You failed the challenge because you can not finished the challenge within the given duration!"
                        handleExit={handleExitFailedChallenge}
                    />
                </>
            );
        }

        return (
            <>
                {blocker.state === "blocked" ? (
                    <ChallengeLeaveModal leave={handleFailed} resume={handleResume} />
                ) : null}
                <FiClock size={24} />
                <p className="text-h6-bold">
                    {minutes} : {seconds}
                </p>
            </>
        );
    };

    if (!challenge) {
        return <p>Loading Challenge Data...</p>;
    }

    if (isCompleted) {
        return (
            <ModalFinish
                headerText="Congratulations 🎉"
                descriptionText="The challenge is completed for today. See you tomorrow 👋"
                handleExit={handleCloseModal}
            />
        );
    }

    if (isFailed) {
        return (
            <ModalFinish
                headerText="You already failed for today's challenge 😭"
                descriptionText="Keep your head up! Try again tomorrow."
                handleExit={handleCloseModal}
            />
        );
    }

    if (isModalOpened) {
        return <ChallengeConfirmModal challenge={challenge} />;
    }

    return (
        <>
            <h1 className="text-h2-semibold text-stroke-600 mb-5">Daily Challenge</h1>

            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <div className="flex grow-0 gap-2 bg-highlight-400 p-4 rounded-sm">
                            <FaRankingStar size={24} />
                            <p className="text-h6-semibold">{challenge.difficulty}</p>
                        </div>
                        <div className="flex grow-0 gap-2 bg-highlight-400 p-4 rounded-sm">
                            <SlBadge size={24} />
                            <p className="text-h6-semibold">{challenge.reward_points} Points</p>
                        </div>
                    </div>
                    <div className="flex gap-2 bg-stroke-500 p-4 rounded-sm justify-end end text-white">
                        <Countdown
                            date={Date.now() + duration}
                            renderer={renderer}
                            ref={countdownRef as LegacyRef<Countdown>}
                            onPause={({ total }) => {
                                setDuration(total);
                            }}
                            onStart={({ total }) => {
                                setDuration(total);
                            }}
                        />
                    </div>
                </div>

                <div className="my-8 max-h-[50vh] overflow-auto">
                    <ChallengeQuestion challenge={challenge} />
                </div>

                <div className="flex">
                    <form className="flex flex-1 gap-4" onSubmit={handleSubmit(handleSubmitAnswer)}>
                        <ChallengeInputAnswer control={control} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default ChallengePage;
