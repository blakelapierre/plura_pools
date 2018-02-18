import { h, render } from 'preact-cycle';

import poolUrls from './pools';

const A = document.createElement('a');

// https://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
const notificationSound =  new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

let difficultyThreshold = 500000000;

if (localStorage) {
  try {
    difficultyThreshold = parseInt(localStorage.getItem('difficultyThreshold'), 10) || difficultyThreshold;
    console.log({difficultyThreshold});
  }
  catch (e) {}
}


const START = (_, mutation) => {
  console.log('started');
  _.started = true;

  _.pools = _.poolUrls.map(url => monitorPool({url, stats: {}}, mutation));
  _.poolsStats = {};
};

const UPDATE_STATS = (_, pool, stats) => {
  console.log(stats);
  Object.assign(pool.stats = pool.stats || {}, stats);
  delete pool.error;

  pool.updated = new Date().getTime();

  const poolsStats = _.pools.reduce((stats, pool) => {
    if (pool.stats.pool) {
      const {hashrate, miners} = pool.stats.pool;
      stats.hashrate += hashrate || 0;
      stats.miners += miners || 0;

      if (hashrate > stats.maxHashrate) stats.maxHashrate = hashrate;
      if (miners > stats.maxMiners) stats.maxMiners = miners;
    }
    return stats;
  }, {hashrate: 0, miners: 0, maxHashrate: 0, maxMiners: 0});

  Object.assign(_.poolsStats, poolsStats);

  if (_.difficultyThreshold > 0 && pool.stats.network.difficulty < _.difficultyThreshold) notificationSound.play();
};

const SET_DIFFICULTY_NOTIFICATION_THRESHOLD = _ => {
  _.difficultyThreshold = parseInt(_.difficultyThresholdInput);
  if (localStorage) {
    localStorage.setItem('difficultyThreshold', _.difficultyThreshold);
  }
};

const DIFFICULTY_THRESHOLD_INPUT = (_, {target: {value}}) => {
  _.difficultyThresholdInput = value;
};

const POOL_ERROR = (_, pool, error) => {
  pool.error = error;
};

const View = (Component) => ({started, ...props}, {mutation}) => (
  <view>
    {started ? <Component {...props} /> : mutation(START)(mutation)}
  </view>
);

const Pools = ({pools, poolsStats}, {mutation}) => (
  <pools>
    <Network pools={pools} />
    <global>
      <h1>All Known Pools</h1>
      <hashrate>Hashrate: {poolsStats.hashrate}</hashrate>
      <miners>Miners: {poolsStats.miners}</miners>
    </global>
    {Object
      .values(pools)
      .sort((a, b) => !a.stats.pool ? 1 : (!b.stats.pool ? -1 : (a.stats.pool.hashrate > b.stats.pool.hashrate ? -1 : 1)))
      .map(pool => <Pool pool={pool} />)}
    <donate>Donate to: TRTLv1W1So77yGbVtrgf8G4epg5Fhq9hEZvpZC8ev86xRVLYsQQMHrxQG92QVjUU3bcE6ThGw9vSbEHBMejJpexE2sdrTC24ZXR</donate>
  </pools>
);

const Network = ({pools}, {difficultyThresholdInput, mutation}) => (
  <network>
    <table>
      <thead>
        <th>pool</th>
        <th>reported network difficulty</th>
      </thead>
      <tbody>
        {pools.map(pool => <tr><td>{A.href = pool.url, A.hostname}</td><td className={new Date().getTime() - pool.updated > 9 * 1000 ? 'difficulty' : 'difficulty updated'}>{(pool.stats.network||{}).difficulty}</td></tr>)}
      </tbody>
    </table>
    <form action="javascript:" onSubmit={mutation(SET_DIFFICULTY_NOTIFICATION_THRESHOLD)}>
      Difficulty threshold for notification: <input type="number" value={difficultyThresholdInput || 0} onInput={mutation(DIFFICULTY_THRESHOLD_INPUT)} />
      <button>Set</button>
    </form>
  </network>
);

const Pool = ({pool:{url, stats, error}}) => (
  <pool>
    <a href={A.href = url, `${A.protocol || 'http'}${A.hostname}`} target="_new">{A.hostname}</a>
    {stats.pool ? <PoolStats stats={stats} /> : undefined}
    {error ? <PoolError error={error} /> : undefined}
  </pool>
);

const PoolStats = ({stats}, {poolsStats}) => (
  <pool-stats>
    <hashrate>Hashrate: {stats.pool.hashrate}</hashrate>
    <hashrate-bar style={{'width': `${stats.pool.hashrate / poolsStats.maxHashrate * 100}%`}}></hashrate-bar>

    <miners>Miners: {stats.pool.miners}</miners>
    <miners-bar style={{'width': `${stats.pool.miners / poolsStats.maxMiners * 100}%`}}></miners-bar>

    <config>
      <div>Fee: {stats.config.fee}</div>
      <div>Min Payment: {stats.config.minPaymentThreshold}</div>

      <table>
        <thead>
          <tr><th>Port</th><th>Difficulty</th><th>Description</th></tr>
        </thead>
        <tbody>
          {stats.config.ports.map(({port, difficulty, desc}) => (
            <tr><td>{port}</td><td>{difficulty}</td><td>{desc}</td></tr>
          ))}
        </tbody>
      </table>
    </config>
  </pool-stats>
);

const PoolError = ({error}) => (
  <pool-error>
    {error.message}
  </pool-error>
);

render(
  View(Pools), {poolUrls, difficultyThresholdInput: difficultyThreshold, difficultyThreshold}, document.body
);

function monitorPool(pool, mutation) {
  fetch(pool.url)
    .then(response => {
      response
        .json()
        .then(json => mutation(UPDATE_STATS)(pool, json))
        .catch(error => console.log('Error decoding json', pool.url, response));
      setTimeout(() => monitorPool(pool, mutation), 10000);
    })
    .catch(error => {
      console.log('Error fetching', pool.url, error);
      mutation(POOL_ERROR)(pool, error);
      setTimeout(() => monitorPool(pool, mutation), 10000);
    });

  return pool;
}

function getPoolStats(url, updateStats) {
  fetch(url).then(response => {
    response.json().then(json => updateStats(url, json));
  });
}