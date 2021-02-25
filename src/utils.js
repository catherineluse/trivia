import React from 'react'

const decodedQuestion = (escapedHTMLquestion) => {
    return React.createElement("div", { 
        dangerouslySetInnerHTML: { 
            __html: escapedHTMLquestion 
        } 
    });
}

export default decodedQuestion