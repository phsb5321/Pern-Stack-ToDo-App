// sfc -> to create statless function 
import React, { Fragment, useState } from 'react'

const InputTodo = () => {

    const [description, setDescription] = useState("")


    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { description }
            await fetch(
                "http://localhost:3000/posttodo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )
            window.location = "/"
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <Fragment>
            <h1 className="text-center mt-5" >
                Pern Todo List
            </h1>
            <form className="mt-5" onSubmit={onSubmitForm}>
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
                <button className='btn btn-block btn-light mt-2'> Add </button>
            </form>
        </Fragment>
    );
}

export default InputTodo;