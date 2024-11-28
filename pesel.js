function validatePESEL(pesel) {
    if (pesel.length !== 11 || !/^\d+$/.test(pesel)) {
        return false;
       }
       const waga = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
       let suma = 0;
       for (let i = 0; i < 10; i++) {
        suma += parseInt(pesel[i]) * waga[i];
       }
       const kontrolka = (10 - (suma % 10)) % 10;
       return kontrolka === parseInt(pesel[10]);
      }
      const miesiace = [
       "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
       "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
      ];
 
 
// Funkcja wyciągająca datę urodzenia z numeru PESEL
 
function extractBirthDateFromPESEL(pesel) {
    if (!validatePESEL(pesel)) {
        return null;
       }
       const rok_Part = pesel.substring(0, 2);
       const miesiac_Part = pesel.substring(2, 4);
       const dzien_Part = pesel.substring(4, 6);
       let rok = parseInt(rok_Part);
       let miesiac = parseInt(miesiac_Part);
       let dzien = parseInt(dzien_Part);
       if (miesiac > 80 && miesiac <= 92) {
        rok += 1800;
        miesiac -= 80;
       } else if (miesiac > 20 && miesiac <= 32) {
        rok += 2000;
        miesiac -= 20;
       } else {
        rok += 1900;
       }
       return `${dzien_Part} ${miesiace[miesiac - 1]} ${rok}`;
      }
 
// Funkcja wyciągająca płeć z numeru PESEL
function extractGenderFromPESEL(pesel) {
    if (!validatePESEL(pesel)) {
     return null;
    }
    const plec = parseInt(pesel[9]);
    return plec % 2 === 0 ? 'Kobieta' : 'Mężczyzna';
   }
function showPESELInfo() {
    const pesel = document.getElementById('pesel').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    if (!validatePESEL(pesel)) {
     resultDiv.innerHTML = '<p class="error">Nieprawidłowy numer PESEL.</p>';
     return;
    }
    const data_ur = extractBirthDateFromPESEL(pesel);
    const plec = extractGenderFromPESEL(pesel);
    resultDiv.innerHTML = `
<p><strong>Data urodzenia:</strong> ${data_ur}</p>
<p><strong>Płeć:</strong> ${plec}</p>
    `;
   }
