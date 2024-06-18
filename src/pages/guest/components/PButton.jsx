const PButton = ({ title = 'Shopping now', href = '/', extraClass = '' }) => {
    const className = `px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn ${extraClass}`;

    return (
        <a href={href} className={className}>
            <div className="text-white text-base font-medium  leading-normal">{title}</div>
        </a>
    );
};

export default PButton;
