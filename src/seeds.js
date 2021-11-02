import _ from 'lodash';
import faker from 'faker';
//const faker = require('Faker');
import { Db, Server } from 'mongodb';
import { GENRES } from './constants';

const MINIMUM_ARTISTS = 200;
const ARTISTS_TO_ADD = 1500;

let artistsCollection;
const db = new Db('upstar_music', new Server('localhost', 27017));
db.open()
  .then(() => {
    artistsCollection = db.collection('artists');
    console.log('Way good')
    const result = artistsCollection.count({}).then(count => {
      if (count < MINIMUM_ARTISTS) {
        console.log('Near1', createArtist())
        const artists = _.times(ARTISTS_TO_ADD, () => createArtist());
        console.log('Near2', artists)
        artistsCollection.insertMany(artists);
      }
    })
    return artistsCollection.count({});
  })
  .catch(e => console.log('Error on seed', e));


function createArtist() {
  return {
    name: faker.Name.findName(),
    age: randomBetween(15, 45),
    yearsActive: randomBetween(0, 15),
    image: faker.random.avatar_uri(),
    genre: getGenre(),
    website: faker.Internet.domainName(),
    netWorth: randomBetween(0, 5000000),
    labelName: faker.Company.companyName(),
    //retired: faker.Random.boolean(),
    retired: getBoolean(),
    albums: getAlbums()
  };
}

function getAlbums() {
  return _.times(randomBetween(0, 5), () => {
    const copiesSold = randomBetween(0, 1000000);

    return {
      title: _.capitalize(faker.random.number()),
      date: faker.Date.past(),
      copiesSold,
      numberTracks: randomBetween(1, 20),
      image: faker.random.avatar_uri(),
      revenue: copiesSold * 12.99
    };
  });
}

function getAlbumImage() {
  const types = _.keys(faker.image);
  const method = randomEntry(types);

  return faker.image[method]();
}

function getGenre() {
  return randomEntry(GENRES);
}
function getBoolean() {
  return ~~(Math.random() < 0.5);
}

function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}
