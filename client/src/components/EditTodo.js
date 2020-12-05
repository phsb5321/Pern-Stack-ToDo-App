import React, { Fragment, useState } from 'react';

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)

    const updateDescription = async (e) => {
        e.preventDefault()
        try {
            const body = { description }
            await fetch(
                `http://localhost:3000/todos/${todo.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
            window.location = "/"
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Fragment>
            <i
                type="button"
                className="far fa-edit"
                data-toggle="modal"
                data-target={`#id${todo.id}`} />

            <div
                className="modal"
                id={`id${todo.id}`}
                onClick={() => setDescription(todo.description)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button
                                type="button"
                                className="close"
                                onClick={() => setDescription(todo.description)}
                                data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <input
                                type="text"
                                placeholder="write here ..."
                                className="form-control"
                                onChange={e => {
                                    setDescription(
                                        e.target.value
                                    )
                                }}
                                value={description} />
                        </div>

                        <div className="modal-footer">
                            <button
                                className='btn btn-block btn-light mt-2'
                                onClick={e => updateDescription(e)}
                                data-dismiss="modal"> Edit </button>

                        </div>

                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default EditTodo;