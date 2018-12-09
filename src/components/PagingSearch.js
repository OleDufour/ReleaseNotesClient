import React, { Component } from 'react';

export const PagingSearch = ({ value,
    onChange,
    onSubmit,
    children
}) =>
    <form onSubmit={onSubmit}>
        <input
            type="text"
            value={value}
            onChange={onChange}
        />
        <button type="submit">
            {children}
        </button>
    </form>

export default PagingSearch;