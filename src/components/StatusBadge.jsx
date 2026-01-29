import React from 'react';

const StatusBadge = ({ children, type = "info" }) => {
    const styles = {
        info: "bg-blue-50 text-blue-700 border-blue-200",
        success: "bg-emerald-50 text-emerald-700 border-emerald-200",
        warning: "bg-orange-50 text-orange-700 border-orange-200",
        danger: "bg-red-50 text-red-700 border-red-200",
    };
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border uppercase ${styles[type]}`}>
            {children}
        </span>
    );
};

export default StatusBadge;
