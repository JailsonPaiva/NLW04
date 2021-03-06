import { CompletedChallenges } from "../components/CompletedChallenges";
import {GetServerSideProps} from 'next'

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengesBox";
import { Countdown } from "../components/Countdown";

import Head from 'next/head'

import style from "../styles/pages/Home.module.css"
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface Homeprops{
  level: number;
  currentExperience: number; 
  challengesCompleted: number;
}

export default function Home(props: Homeprops) {
  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
    <div className={style.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>

     <ExperienceBar/>

    <CountdownProvider>
     <section>
     <div>
        <Profile />
        <CompletedChallenges />
        <Countdown />
     </div>
     <div>
        <ChallengeBox />
     </div>
   </section>
   </CountdownProvider>
   </div>
   </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;


  return{
      props: {
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengesCompleted: Number(challengesCompleted)
      }
    }
}