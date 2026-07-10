import './Card.css'

const Card = ({title, desc, emoji}) => {
    return (
        <div className="card">
            <p>{emoji}</p>
            <span>{title}</span>
            <h3>{desc}</h3>
        </div>
    )
}

export default Card