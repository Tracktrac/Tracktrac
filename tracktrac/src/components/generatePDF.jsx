import { jsPDF } from "jspdf";
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const GeneratePdf = ({ data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Check if data is valid before proceeding
    if (!data || !Array.isArray(data.yearlyData) || !Array.isArray(data.topSongs) || !Array.isArray(data.topArtists) || !Array.isArray(data.monthlyData)) {
      console.error("Invalid data format");
      return;
    }

    // Establecer fuente para el título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);  // Tamaño de la fuente para el título
    doc.text("Spotify Listening Recap", 20, 20);

    doc.setFontSize(14); 
    // Título con fondo y borde
    doc.text("Total Stats", 20, 40); // Título de la sección de totales

    // Restablecer color del texto
    doc.setTextColor(0, 0, 0);

    // Añadir los totales con formato
    doc.setFontSize(12);  // Tamaño de la fuente para el texto normal
    
    // Total Plays
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Plays:`, 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.totalPlays}`, 70, 50);

    // Total Minutes
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Minutes:`, 20, 55);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.totalMinutes}`, 70, 55);

    // Total Hours
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Hours:`, 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.totalHours}`, 70, 60);

    // Total Days
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Days:`, 20, 65);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.totalDays}`, 70, 65);

    // Agregar una línea divisoria
    doc.setLineWidth(0.5);
    doc.line(10, 75, 200, 75); // Línea divisoria

    // Agregar los datos anuales
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);  // Títulos de la sección de años
    doc.text("Streams per Year", 20, 85); // Título de la sección de años
    doc.setFont('helvetica', 'normal');
    let currentY = 95; // Establecer la posición de Y para los datos

    data.yearlyData.forEach((item) => {
      if (currentY > 270) { // Comprobar si estamos cerca del final de la página
        doc.addPage();  // Agregar una nueva página
        currentY = 20;  // Restablecer la posición Y en la nueva página
      }
      doc.text(`${item.year}: ${item.count} streams`, 20, currentY);
      currentY += 6; // Espaciado para cada año
    });

    // Agregar otra línea divisoria después de los datos anuales
    doc.line(10, currentY, 200, currentY); // Línea divisoria
    currentY += 7; // Dejar espacio después de la línea

    // Agregar los streams por mes
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);  // Títulos de la sección de meses
    doc.text("Streams per Month", 20, currentY); // Título de la sección de meses
    doc.setFont('helvetica', 'normal');
    currentY += 8; // Reducir el espacio entre título y contenido

    data.monthlyData.forEach((monthData, index) => {
      if (currentY > 270) { // Comprobar si estamos cerca del final de la página
        doc.addPage();  // Agregar una nueva página
        currentY = 20;  // Restablecer la posición Y en la nueva página
      }
      doc.text(`${monthData.month}: ${monthData.count} streams`, 20, currentY);
      currentY += 6; // Espaciado para cada mes
    });

    // Agregar otra línea divisoria después de los streams mensuales
    doc.line(10, currentY, 200, currentY); // Línea divisoria
    currentY += 7; // Dejar espacio después de la línea

    // Añadir las canciones más escuchadas
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);  // Títulos de la sección de canciones
    doc.text("Top 10 Most Listened Songs", 20, currentY);
    doc.setFont('helvetica', 'normal');
    currentY += 8; // Reducir el espacio entre título y contenido

    data.topSongs.forEach((song, index) => {
      if (currentY > 270) { // Comprobar si estamos cerca del final de la página
        doc.addPage();  // Agregar una nueva página
        currentY = 20;  // Restablecer la posición Y en la nueva página
      }
      doc.text(`${index + 1}. ${song[0]} - ${song[1]} streams`, 20, currentY);
      currentY += 6; // Reducir el espaciado para cada canción
    });

    // Agregar otra línea divisoria después de las canciones
    doc.line(10, currentY, 200, currentY); // Línea divisoria
    currentY += 7; // Dejar espacio después de la línea

    // Añadir los artistas más escuchados
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);  // Títulos de la sección de artistas
    doc.text("Top 10 Most Listened Artists", 20, currentY);
    doc.setFont('helvetica', 'normal');
    currentY += 8; // Reducir el espacio entre título y contenido

    data.topArtists.forEach((artist, index) => {
      if (currentY > 270) { // Comprobar si estamos cerca del final de la página
        doc.addPage();  // Agregar una nueva página
        currentY = 20;  // Restablecer la posición Y en la nueva página
      }
      doc.text(`${index + 1}. ${artist[0]} - ${artist[1]} streams`, 20, currentY);
      currentY += 6; // Reducir el espaciado para cada artista
    });

    // Agregar una pequeña nota o pie de página
    doc.setFontSize(10); // Tamaño de fuente para el pie de página
    doc.text("Generated by TrackTrac", 150, currentY + 10);

    doc.save("Spotify_Recap.pdf");
  };

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={generatePDF} 
        startIcon={<DownloadIcon />} 
        sx={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", borderRadius: 4 }}
      >
        Download PDF
      </Button>
    </div>
  );
};

export default GeneratePdf;

