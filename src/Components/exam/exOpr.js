import { read, utils } from 'xlsx';
const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e.target.error);
      reader.readAsArrayBuffer(file);
    });
  };
  
  const getqestionFromxl = async (event) => {
    const file = event.target.files[0];
    try {
      const arrayBuffer = await readFileAsync(file);
      const data = new Uint8Array(arrayBuffer);
      const workbook = read(data, { type: 'array' });
  
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      const questions = utils.sheet_to_json(sheet);
  
      const formattedQuestions = questions.map((question) => {
        const options = [];
        let index = 1;
        while (question[`opt${index}`]) {
          options.push(question[`opt${index}`]);
          index++;
        }
        return {
          text: question.question,
          options: options,
          selectedOptionIndex: parseInt(question.ansindex),
        };
      });
  
      return formattedQuestions.filter(
        (x) =>
          x.selectedOptionIndex &&
          x.selectedOptionIndex > 0 &&
          x.selectedOptionIndex <= x.options.length
      );
    } catch (error) {
      console.error('Error reading Excel file:', error);
      throw error;
    }
  };
  
  
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  };

export{
    getCookie,getqestionFromxl
}