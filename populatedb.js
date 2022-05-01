#! /usr/bin/env node

// Get arguments passed on command line

const userArgs = process.argv.slice(2);

const async = require('async');
const mongoose = require('mongoose');
const Opening = require('./models/opening');
const Variation = require('./models/variation');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const openings = [];
const variations = [];

const openingCreate = (openingDetail, cb) => {
  const opening = new Opening(openingDetail);

  opening.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Opening: ${opening}`);
    openings.push(opening);
    cb(null, opening);
  });
};

const variationCreate = (variationDetail, cb) => {
  const variation = new Variation(variationDetail);

  variation.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Variation: ${variation}`);
    variations.push(variation);
    cb(null, variation);
  });
};

const sicilianDefenseId = new mongoose.Types.ObjectId().toHexString();
const dragonVariationId = new mongoose.Types.ObjectId().toHexString();
const alapinVariationId = new mongoose.Types.ObjectId().toHexString();
const najdorfVariationId = new mongoose.Types.ObjectId().toHexString();
const londonSystemId = new mongoose.Types.ObjectId().toHexString();
const ruyLopezOpeningId = new mongoose.Types.ObjectId().toHexString();
const berlinDefenseId = new mongoose.Types.ObjectId().toHexString();
const schliemannJaenischGambitId = new mongoose.Types.ObjectId().toHexString();
const birdsOpeningId = new mongoose.Types.ObjectId().toHexString();
const fromsGambitId = new mongoose.Types.ObjectId().toHexString();
const viennaGameId = new mongoose.Types.ObjectId().toHexString();
const falkbeerVariationId = new mongoose.Types.ObjectId().toHexString();
const maxLangeDefenseId = new mongoose.Types.ObjectId().toHexString();

const sicilianDefense = {
  name: 'Sicilian Defense',
  description:
    "The Sicilian Defense is the most popular response to White's 1.e4. Employed by masters and beginners alike, the Sicilian Defense is a reputable and positionally sound opening. Still, the Sicilian is a combative opening that tends to lead to dynamic and sharp positions.",
  moves: '1. e4 c5',
  origin: 'Giulio Cesare Polerio, 1594.',
  _id: sicilianDefenseId,
  variations: [dragonVariationId, alapinVariationId, najdorfVariationId],
  chessDotComUrl: 'https://www.chess.com/openings/Sicilian-Defense',
};

const dragonVariation = {
  name: 'Dragon Variation',
  moves: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6',
  description:
    'Black fianchettoes their dark-squared bishop, attacking the center and the queenside. This variation is one of the most aggressive for Black. In its most critical lines, Black castles kingside and White castles queenside, with both players racing to checkmate first.',
  _id: dragonVariationId,
  opening: sicilianDefenseId,
  origin: 'Fyodor Dus-Chotimirsky, 1901. Named after Constellation Draco.',
};

const alapinVariation = {
  name: 'Alapin Variation',
  moves: '1.e4 c5 2.c3',
  description:
    "The Alapin Variation happens after the moves 1.e4 c5 2.c3. White's 2.c3 prepares the d2-d4 pawn advance, with the downside that the c3-square will no longer be available for the knight. This line is excellent for players who want to avoid the massive amount of theory behind other variations.",
  _id: alapinVariationId,
  opening: sicilianDefenseId,
  origin: 'Named after Russian master Semyon Alapin.',
};

const najdorfVariation = {
  name: 'Najdorf Variation',
  moves: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6',
  description:
    "The Najdorf Variation is one of the most popular lines in the Sicilian Defense and was frequently used by both Fischer and Kasparov. It starts after the moves 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6. Black's 5...a6 prepares counterplay on the queenside while maintaining flexibility. Heavily theoretical, this line usually leads to complex games with a wealth of tactical possibilities.",
  _id: najdorfVariationId,
  opening: sicilianDefenseId,
  origin: 'Named after the Polish-Argentine grandmaster Miguel Najdorf.',
};

const londonSystem = {
  name: 'London System',
  moves: '1.d4 d5 2.Nf3 Nf6 3.Bf4',
  description:
    "The London System is a popular 1.d4 opening for White which has the reputation of being very solid. The London is considered a system because White can play the same basic setup for almost all of Black's responses. For this reason, the theory on the London is not as extensive as it is for other openings.",
  origin: '1922 London tournament.',
  _id: londonSystemId,
  chessDotComUrl: 'https://www.chess.com/openings/London-System',
};

const ruyLopezOpening = {
  name: 'Ruy Lopez Opening',
  moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5',
  description:
    "The Ruy Lopez (also known as the Spanish Opening or Spanish Game) is one of the oldest and most analyzed openings in chess history. Most of the world's top players have adopted this rich opening as part of their repertoire, and many of them play it with both colors. Despite having a large amount of theory, it is an opening that players of all levels can enjoy.",
  origin: 'Named after the 16th-century Spanish priest Ruy López de Segura.',
  _id: ruyLopezOpeningId,
  variations: [berlinDefenseId, schliemannJaenischGambitId],
  chessDotComUrl: 'https://www.chess.com/openings/Ruy-Lopez-Opening',
};

const berlinDefense = {
  name: 'Berlin Defense',
  moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6',
  description:
    "The Berlin Defense is one of Black's most solid responses to the Ruy Lopez. Players usually go for an early queen exchange. Black accepts doubled pawns on the c-file and forfeits castling rights for the bishop pair and a solid position.",
  origin: 'Received its name from the Berliners that examined its variations.',
  _id: berlinDefenseId,
  opening: ruyLopezOpeningId,
};

const schliemannJaenischGambit = {
  name: 'Schliemann-Jaenisch Gambit',
  moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5 f5',
  description:
    "The Schliemann-Jaenisch Gambit is one of Black's aggressive ways of meeting the Ruy Lopez. Black immediately strikes back in the center, instead of building a solid position and playing for equality. The imbalanced positions that arise from this variation are difficult to navigate for both sides.",
  origin: 'Originated by Carl Jaenisch in 1847.',
  _id: schliemannJaenischGambitId,
  opening: ruyLopezOpeningId,
};

const birdsOpening = {
  name: "Bird's Opening",
  moves: '1.f4',
  description:
    "The Bird's Opening is an aggressive flank opening for White. Championed by the English master Henry Bird, this opening is not popular among the masters of today. However, despite its offbeat quality, the Bird's opening is playable and could be a good surprise weapon for club-level players. The opening also has very little theory, so it can be a good option for players who don't want to study heavy theory.",
  origin: 'The British master Henry Edward Bird first played it in 1855.',
  variations: [fromsGambitId],
  _id: birdsOpeningId,
  chessDotComUrl: 'https://www.chess.com/openings/Birds-Opening',
};

const fromsGambit = {
  name: "From's Gambit",
  moves: '1.f4 e5',
  description:
    "Black may decide to answer the Bird's Opening with the From's Gambit, its most double-edged variation. This line occurs after 1.f4 e5 when Black offers a pawn for quick development. From there, White can play 2.e4 and enter the King's Gambit or accept the challenge and play 2.fxe5, after which the game gets extremely complicated.",
  _id: fromsGambitId,
  opening: birdsOpeningId,
};

const viennaGame = {
  name: 'Vienna Game',
  moves: '1.e4 e5 2.Nc3',
  description:
    'The Vienna Game is a 1.e4 opening for White. Compared to other 1.e4 openings, the Vienna is much less common but theoretically sound. Because of this, it can be an excellent weapon for beginners to catch their opponents by surprise. The Vienna is also suitable for more experienced players, with GMs like Viswanathan Anand and Alexander Shabalov among the players who have played it.',
  origin:
    "Originally called Hamppe's Game after Carl Hamppe (1815-1876) and took its current name in the 1890's.",
  _id: viennaGameId,
  variations: [falkbeerVariationId, maxLangeDefenseId],
  chessDotComUrl: 'https://www.chess.com/openings/Vienna-Game',
};

const falkbeerVariation = {
  name: 'Falkbeer Variation',
  moves: '1.e4 e5 2.Nc3 Nf6',
  description:
    "Black's most popular response to the Vienna game is the Falkbeer Variation, which starts after 1.e4 e5 2.Nc3 Nf6. Black develops a knight and puts pressure on the white e4-pawn. Black's last move also helps them play the d7-d5 push if White plays the Vienna Gambit (discussed shortly).",
  _id: falkbeerVariationId,
  opening: viennaGameId,
};

const maxLangeDefense = {
  name: 'Max Lange Defense',
  moves: ' 1.e4 e5 2.Nc3 Nc6',
  description:
    "The Max Lange Defense starts after the moves 1.e4 e5 2.Nc3 Nc6. Black follows White's lead and develops the queenside knight, supporting their e5-pawn. The game can then transpose to the Three Knights Opening if White plays 3.Nf3. White can also stay in the Vienna by developing their light-squared bishop on b5, c4, or g2.",
  origin: 'Named for the German master Max Lange, who suggested it in 1854.',
  _id: maxLangeDefenseId,
  opening: viennaGameId,
};

const createOpenings = (cb) => {
  async.parallel(
    [
      (callback) => {
        openingCreate(sicilianDefense, callback);
      },
      (callback) => {
        openingCreate(londonSystem, callback);
      },
      (callback) => {
        openingCreate(ruyLopezOpening, callback);
      },
      (callback) => {
        openingCreate(birdsOpening, callback);
      },
      (callback) => {
        openingCreate(viennaGame, callback);
      },
    ],
    // optional callback
    cb,
  );
};

const createVariations = (cb) => {
  async.parallel(
    [
      (callback) => {
        variationCreate(dragonVariation, callback);
      },
      (callback) => {
        variationCreate(alapinVariation, callback);
      },
      (callback) => {
        variationCreate(najdorfVariation, callback);
      },
      (callback) => {
        variationCreate(berlinDefense, callback);
      },
      (callback) => {
        variationCreate(schliemannJaenischGambit, callback);
      },
      (callback) => {
        variationCreate(fromsGambit, callback);
      },
      (callback) => {
        variationCreate(falkbeerVariation, callback);
      },
      (callback) => {
        variationCreate(maxLangeDefense, callback);
      },
    ],
    // optional callback
    cb,
  );
};

async.series(
  [createOpenings, createVariations],
  // Optional callback
  (err, results) => {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
      return;
    }
    console.log(results);
    // All done, disconnect from database
    mongoose.connection.close();
  },
);
