import './Greeting.css'

const Greeting = ({name, age}) => {
    return (
        <>
        <h1 className="head">Hello - {name} : {age}</h1>
        </>
    )
}

export default Greeting