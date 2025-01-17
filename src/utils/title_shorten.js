export default function (title, length = 14) {
    let pattern = `((?=([\\w\\W]{0,${length}}))([\\w\\W]{8,})([\\w\\W]{8,}))`;

    return title.replace(new RegExp(pattern), '$2..$4');
};
