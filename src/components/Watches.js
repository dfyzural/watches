import { useEffect, useState } from 'react';
import moment from 'moment'
import 'moment-timezone';
import FormAdd from './FormAdd';
import { nanoid } from 'nanoid'


export default function Watches() {
    const [watches, setWatches] = useState([
        {
            id: nanoid(),
            name: "Москва",
            zone: "+3"
        }
    ])

    
    const currentDateTime = () => moment().tz("America/Los_Angeles").format();
    const [currentTime, setCurrentTime] = useState(currentDateTime())

    const addWatch = (watch) =>
        setWatches((prewWatches) => {
            if (prewWatches.find((o) => o.name === watch.name)) {
                return prewWatches.map((o) => {
                    if (o.name === watch.name) {
                        return { id: o.id, name: o.name, zone: watch.zone }
                    }
                    return o
                })
            }
            return [...prewWatches, watch]
        })


    useEffect(() => {
        const interval = setInterval(
            () => setCurrentTime(currentDateTime()),
            1000
        );

        return () => {
            clearInterval(interval);
        }
    }, []);

    const deleteWatch = (id) => {
        setWatches(watches.filter((item) => item.id !== id));
    };

    return (
        <>
            <FormAdd addWatch={addWatch} />
            <div className="watch-list">
                {watches.map(watch =>
                    <div className='watch' key={watch.id}>
                        <div className='watch-name'>{watch.name}</div>
                        <div className='watch-time'>{moment().add(watch.zone, 'hours').utc().format("DD-MM-YYYY HH:mm:ss")}</div>
                        <div className='watch-zone'>(GMT {watch.zone})</div>
                        <button className="watch-delete" onClick={() => deleteWatch(watch.id)}>🗙</button>
                    </div>
                )}
            </div>
        </>
    )
}