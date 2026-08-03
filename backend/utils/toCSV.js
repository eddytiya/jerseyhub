const escapeCSVField = (value) => {

    const str = value === null || value === undefined ? "" : String(value);

    if (/[",\n]/.test(str)) {

        return `"${str.replace(/"/g, '""')}"`;

    }

    return str;

};

/* ==========================================
    CONVERTS AN ARRAY OF OBJECTS TO CSV TEXT
========================================== */

const toCSV = (rows, columns) => {

    const header = columns.map(col => escapeCSVField(col.label)).join(",");

    const body = rows.map(row =>

        columns.map(col => escapeCSVField(col.value(row))).join(",")

    ).join("\n");

    return `${header}\n${body}`;

};

module.exports = toCSV;
