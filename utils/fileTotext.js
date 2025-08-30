function Fileparser(text){


  const questionsArray = [];
  
  const blocks = text.split(/\n\s*\n/);
  for (let block of blocks) {
    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) continue;

    const questionLine = lines[0].replace(/^Q\d+:\s*/, "");

    const options = [];
    let answer = "";

    for (let line of lines.slice(1)) {
      if (/^Answer:/i.test(line)) {
        answer = line.replace(/^Answer:\s*/i, "").trim();
      } else {
        options.push(line.replace(/^[a-z]\)\s*/, "").trim());
      }
    }

    if (questionLine && options.length && answer) {
      questionsArray.push({
        question: questionLine,
        option: options,
        answer: answer
      });
    }
  }

  return questionsArray;
}
export {Fileparser}