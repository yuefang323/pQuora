import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import NavBar from "../NavBar";
import CreatedAt from "../util/CreatedAt";
import UpdatedAt from "../util/UpdatedAt";

import * as questionsActions from "../../store/questions";

const QuestionsToAnswerPage = () => {
    const user = useSelector((state) => state.session.user);
    const questions = useSelector((state) => state.questions);
    const questionsList = Object.values(questions);
    const questionsToAnswer = questionsList.filter((obj) => obj.owner_id !== user.id )
    const questionsOrdered = questionsToAnswer.sort((a, b) =>
        b.updated_at.localeCompare(a.updated_at)
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(questionsActions.getAllQuestions());
    }, []);

    if (!user) return <Redirect to="/" />;

    return (
        <div className="home-page-wrapper">
            <NavBar />
            <div className="questions-list-content">
                {questionsOrdered.map((obj) => (
                    <div key={"question" + obj.id}>
                        <NavLink
                            to={`/questions/${obj.id}`}
                            exact={true}
                            className="question-detail"
                        >
                            <div>
                                <p className="question-detail">{obj.content}</p>
                            </div>
                        </NavLink>
                        <div className="time">
                            <div className="create-at-time">
                                Created at:{' '}
                                <CreatedAt created_at={obj.created_at} />
                            </div>
                            <div className="update-at-time">
                                Updated at:{' '}
                                <UpdatedAt updated_at={obj.updated_at} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsToAnswerPage;