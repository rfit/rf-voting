import React from 'react'

import s from './Container.css'

import SelectionProjects from '../Selection/Selection.container'
import Voting from '../Voting/Voting.container'
import Submit from '../Voting/Submit/Submit.component';

export class Container extends React.Component {
  render () {
    const t3para6 = "www.cirkustvaers.dk "
    const t3para7 = "https://youtu.be/6VwcU4_xYxM "

    const t4 = "Bæredygtige fællesskaber "
    const t4para1 = "Foreningen Roskilde Festival støtter initiativer, der arbejder med bæredygtighed, miljø og klima, særligt med involvering af børn og unge og baseret på frivillighed, med fokus på hvordan vi i fællesskab kan finde løsningerne for en grønnere verden og et bedre klima for kommende generationer."
    const t4para2 = "Stem på Environmental Justice Foundation"

    const title2 = "Cast your vote!"

    return (
      <div className={s.root}>
        <div className={s.infoContainer}>
          <h1>
           Tekst til afstemningsside – årsfest
          </h1>
          <p>
            Vi fortsætter selvfølgelig traditionen med at uddele en eller flere onationer i forbindelse med Årsfesten og fejringen af årets indsats. Men i år vil vi gerne have dit bidrag til, hvordan puljen på 500.000 kr. skal fordeles. 
          </p>
          <p>
            Vi har på forhånd udvalgt tre modtagere, der hver repræsenterer et af de tre indsatsområder som donationsarbejdet har i 2018. Hver af modtagerne får 75.000 kr. som udgangspunkt. De sidste 275.000 kr. kan du være med til at fordele blandt de tre organisationer, ved at fortælle os, hvilken indsats dit hjerte brænder for. 
          </p>
          <p className={s.voteFor}>
            <i>
              Alle deltagere til årsfesten har én stemme hver, og afstemningen lukker d.15. august 2018.
            </i>
          </p>

          <h2>
            Student Refugees
          </h2>
          <p>
            Student Refugees er et studenterdrevet projekt, som har til formål at støtte personer med flygtningebaggrund i at søge ind på videregående uddannelser i Danmark, og at støtte dem efter de er blevet optaget. Vi ønsker at give alle uanset baggrund lige muligheder for at få en uddannelse i Danmark enten ved at starte på en ny uddannelse eller få muligheden for at fortsætte uddannelsen fra hjemlandet. Det danske uddannelses- og optagelsessystem er komplekst. Student Refugees giver et overblik, finder frem til relevante kontaktpersoner i uddannelsessystemet og følger de personer vi hjælper hele vejen igennem, både med praktisk information, men også med moralsk opbakning, hvor vi giver troen på at det er muligt.
          </p>
          <p>
            Til dem, som bliver optaget på en uddannelse, tilbyder vi en \"buddy\" -  altså en medstuderende, som kan hjælpe dem godt i gang i studiemiljøet og i en dansk uddannelseskontekst. 
          </p>
          <p>
            Vi gør det, både fordi vi ønsker at gøre en forskel for den enkelte, men også for sammen at skabe et samfund, vi kan være stolte af. Vi ønsker at modarbejde et mediebillede af flygtninge, som en belastning for samfundet, da vi ved, der findes mange spildte ressourcer blandt veluddannede flygtninge, som ikke får mulighed for at bruge de kompetencer, de bringer med sig. At være en del af Student Refugees er en helt konkret måde i fællesskab at kunne ændre det billede og få en stemme i samfundsdebatten. 
          </p>
          <img src='studRef1.jpg' />
          <img src='studRef2.jpg' />
          <p className={s.voteFor}>
            <i>
              Stem på Projektet Student Refugees
            </i>
          </p>

          <h2>
            Cirkus Tværs
          </h2>
          <p>
            CIRKUS TVÆRS i Gellerup,er et socio - kulturelt tilbud til børn og unge. \“All different, all equal\” er vores motto. Gennem cirkus giver vi vores medlemmer forskellige færdigheder både fysiske, psykiske og sociale. Det er gratis at være med og vi har åbent hverdag fra kl. 13-18. Vi træner,laver workshops og optræder.... på tværs af alder, religion, og køn.
          </p>
          <p>Cirkus Tværs arbejder med at fastholde børn og unge i en positiv, kreativ og aktiv hverdag. </p>
          <img src='cirkus1.jpeg' />
          <img src='cirkus2.jpeg' />
          <p>Se mere på:
          <a href={t3para6}>vores hjemmeside </a>
          eller 
          <a href={t3para7}>YouTube</a>
          </p>
          <p className={s.voteFor}><i>Stem på Foreningen Cirkus Tværs</i></p>

          <h2>{t4}</h2>
          <p>{t4para1}</p>
          <p className={s.voteFor}><i>{t4para2}</i></p>
        </div>

        <div className={s.voteContainer}>
          <h1>{title2}</h1>
          <SelectionProjects />
          <Voting />
        </div>
      </div>
    )
  }
}
