import { useChallengeApi } from "@/api/challenge";
import { useStudentApi } from "@/api/student";
import useChallengeContext from "@/context/challengeContext";
import useStudentContext from "@/context/studentContext";
import { ChallengeInputs } from "@/types/challenge";
import { TablesUpdate } from "@/types/database.types";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useChallenge = () => {
    const navigate = useNavigate();

    const { getChallenge, updateChallenge } = useChallengeApi();
    const { updateStudent } = useStudentApi();

    const { student } = useStudentContext();
    const { challenge, isModalOpened, setChallenge, duration, setDuration } = useChallengeContext();

    useEffect(() => {
        const fetchChallenge = async () => {
            const challenge = await getChallenge(6);

            setChallenge(challenge);
            setDuration((challenge.durations - 55) * 1000);
        };

        if (!challenge) {
            fetchChallenge();
        }

        return () => {};

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [challenge]);

    const handleUpdateChallege = async () => {
        const { id: studentId, points, current_xp, streaks } = student!;
        const { id: challengeId, user_ids, reward_points, reward_xp } = challenge!;

        const newChallengeUserIds = [...user_ids, studentId!];

        const updatedChallenge: TablesUpdate<"challenges"> = {
            user_ids: newChallengeUserIds
        };

        const updatedStudent: TablesUpdate<"students"> = {
            points: points + reward_points,
            current_xp: current_xp + reward_xp,
            streaks: streaks + 1,
            has_finished_challenge: true,
            last_challenge_timestamp: new Date().toISOString()
        };

        const challengeResponse = updateChallenge(challengeId, updatedChallenge);
        const studentResponse = updateStudent(studentId, updatedStudent);

        console.log(challengeResponse, studentResponse);
    };

    const handleSubmitAnswer: SubmitHandler<ChallengeInputs> = async ({ answer }) => {
        const isCorrect = checkAnswer(answer);

        if (isCorrect) {
            handleUpdateChallege();

            return;
        } else {
            return;
        }
    };

    const updateFailedStudent = async () => {
        const updatedStudent: TablesUpdate<"students"> = {
            has_failed_challenge: true,
            streaks: 0,
            last_challenge_timestamp: new Date().toISOString()
        };

        const studentId = student?.id as number;

        const studentResponse = updateStudent(studentId, updatedStudent);

        console.log(studentResponse);
    };

    const handleExitChallenge = () => {
        navigate("/dashboard");
    };

    const checkAnswer = (answer: string): boolean => {
        return challenge?.answers.includes(answer.trim()) as boolean;
    };

    const isStudentFailed = () => {
        return student?.has_failed_challenge;
    };

    const isStudentCompleted = () => {
        return student?.has_finished_challenge;
    };

    return {
        isModalOpened,
        challenge,
        student,
        duration,
        handleUpdateChallege,
        updateFailedStudent,
        handleSubmitAnswer,
        handleExitChallenge,
        setDuration,
        isStudentFailed,
        isStudentCompleted,
        checkAnswer
    };
};