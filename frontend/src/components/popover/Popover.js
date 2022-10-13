function Popover({ children, className, onHoverOut }) {
    return <div className={`p_over ${className}`} onMouseLeave={onHoverOut}>{children}</div>;
}

export default Popover;
