import stopWords from "./stopWords";
import synonyms from "./synonyms";

const normalizeMessage = (message) => {

    let text = message.toLowerCase();

    text = text.replace(/[^\w\s]/g, " ");

    Object.entries(synonyms).forEach(

        ([key, value]) => {

            const regex = new RegExp(`\\b${key}\\b`, "g");

            text = text.replace(regex, value);

        }

    );

    const words = text

        .split(/\s+/)

        .filter(Boolean)

        .filter(

            word =>

                !stopWords.includes(word)

        );

    return words.join(" ");

};

export default normalizeMessage;