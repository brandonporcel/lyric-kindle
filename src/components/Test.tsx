import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import * as html from "html2canvas";
import { generatePdf } from "@/services/backend.service";

function Test() {
  const resumeRef = useRef<any>(null);
  const generate = async () => {
    const template =
      '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n        <meta charset="UTF-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <title>Kindle-Genius</title>\n    </head>\n    <body>\n      \n    <h1 font-size="medium" class="SongHeaderdesktop__Title-sc-1effuo1-8 fTHPLE"><span class="SongHeaderdesktop__HiddenMask-sc-1effuo1-11 iMpFIj">Sunny</span></h1><div data-lyrics-container="true" class="Lyrics__Container-sc-1ynbvzw-1 kUgSbL">[Letra de “Sunny”]<br><br>[Verso 1]<br>Sunny, solo con mirarte sale el sol<br>Sunny, ni una sola nube entre tu y yo<br>Hoy empiezo a vivir, no me duele el dolor<br>Es que por fin, me llego el amor<br>Esa es la verdad, te quiero<br><br>[Coro]<br>Sunny, gracias por hacerme sonreír<br>Sunny, gracias por tus ganas de vivir<br>Por entender, por confiar<br>Por discutir, por perdonar<br>Por eso y mucho mas, te quiero<br><br>[Verso 2]<br>Sunny, has llegado siempre tan puntual<br>Sunny, cuando el corazón marchaba mal<br>Gracias a ti, hoy estoy aquí<br>Dejo al amor, hablar por mi<br>Esa es la verdad, te quiero<br><br>[Interludio Instrumental]<br><br>[Coro]<br>Por entender, por confiar<br>Por discutir, por perdonar<br>Por eso y mucho mas, te quiero<br></div><br><div data-lyrics-container="true" class="Lyrics__Container-sc-1ynbvzw-1 kUgSbL">[Outro]<br>Sunny, gracias por hacerme tan feliz<br>Sunny, gracias por estar de nuevo aquí<br>Tu me has llevado sin pensar, a los limites del mar<br>Sunny, es la verdad, te quiero</div><br>\n  \n    </body>\n    </html>\n  ';
  };
  return (
    <div>
      <button onClick={generate}>Generate Resume PDF</button>
      <div ref={resumeRef} style={{ width: "60%", margin: "5rem" }}>
        <h1>checkckckkc</h1>
        <h1>checkckckkc</h1>
        <h1>checkckckkc</h1>
        <h1>checkckckkc</h1>
        <h1>checkckckkc</h1>
      </div>
    </div>
  );
}

export default Test;
