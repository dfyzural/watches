import { useState } from "react";
import { nanoid } from 'nanoid'

export default function FormAdd({ addWatch }) {

    const [form, setForm] = useState({ name: "", zone: "" })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setForm((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (evt => {
        evt.preventDefault()

        const newWatch = {
            id: nanoid(),
            name: form.name,
            zone: form.zone
        }

        if (newWatch.name == 0){
            return null;
        }

        addWatch(newWatch)
    })

    return (
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label">Название
                <input className="form-input" type="text" name="name" onChange={handleChange} required />
            </label>
            <label htmlFor="zone" className="form-label">Временная зона
                <input className="form-input" type="text" name="zone" onChange={handleChange} required />
            </label>
            <input type="submit" value="Добавить" />
        </form>
    )
}