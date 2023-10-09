import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = ({download,setLoader}) => {


    // Define the content to be added to the PDF (e.g., the content of a div)
    const content = document.getElementById(download);
    setLoader(true);
    html2canvas(content).then((canvas)=>{
        const imgData = canvas.toDataURL('img/png');
        const doc = new jsPDF('l','mm','a4');
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData,'PNG',0,0,componentWidth,componentHeight);
        setLoader(false);
        doc.save('admit-card.pdf');
    })


    };
