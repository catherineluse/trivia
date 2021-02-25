import React from 'react'

const decodedQuestion = (escapedHTMLquestion: string) => {
    return React.createElement("div", { 
        dangerouslySetInnerHTML: { 
            __html: escapedHTMLquestion 
        } 
    });
}

export default decodedQuestion