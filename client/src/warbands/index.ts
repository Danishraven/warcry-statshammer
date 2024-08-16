import Bonesplitterz from './Bonesplitterz';
import CorvusCabal from './CorvusCabal';
import CypherLords from './CypherLords';
import DaughtersOfKhaine from './DaughtersOfKhaine';
import FleshEaterCourts from './FleshEaterCourts';
import GloomspiteGitz from './GloomspiteGitz';
import IdonethDeepkin from './IdonethDeepkin';
import IronGolems from './IronGolems';
import Ironjawz from './Ironjawz';
import LegionsOfNagash from './LegionsOfNagash';
import Nighthaunt from './Nighthaunt';
import SplinteredFang from './SplinteredFang';
import TheUnmade from './TheUnmade';
import UntamedBeasts from './UntamedBeasts';
import Vanguard from './Vanguard';
import Bloodbound from './Bloodbound';
import Skaven from './Skaven'
import { IWarband } from './warbands.types';

const chaosWarbands: IWarband[] = [
  CorvusCabal,
  CypherLords,
  IronGolems,
  SplinteredFang,
  TheUnmade,
  UntamedBeasts,
  Bloodbound,
  Skaven,
];

const deathWarbands: IWarband[] = [FleshEaterCourts, LegionsOfNagash, Nighthaunt];

const destructionWarbands: IWarband[] = [Bonesplitterz, GloomspiteGitz, Ironjawz];

const orderWarbands: IWarband[] = [DaughtersOfKhaine, IdonethDeepkin, Vanguard];

const warbands: IWarband[] = [...chaosWarbands, ...deathWarbands, ...destructionWarbands, ...orderWarbands];

export default warbands;
