
exports.seed = async function(knex) {
  await knex('entries').truncate()
  await knex('entries').insert([
    {
      date: '01-01-2020',
      sleep_start: '11pm',
      sleep_end: '7am',
      total_time: 8,
      mood_score: 4,
      user_id: 1
    },
    {
      date: '01-02-2020',
      sleep_start: '2am',
      sleep_end: '7am',
      total_time: 5,
      mood_score: 2,
      user_id: 1
    },
    {
      date: '01-01-2020',
      sleep_start: '7pm',
      sleep_end: '7am',
      total_time: 12,
      mood_score: 2,
      user_id: 2
    },
    {
      date: '01-02-2020',
      sleep_start: '10pm',
      sleep_end: '6am',
      total_time: 8,
      mood_score: 4,
      user_id: 2
    },
    {
      date: '01-01-2020',
      sleep_start: '12pm',
      sleep_end: '7am',
      total_time: 7,
      mood_score: 3,
      user_id: 3
    },
    {
      date: '01-02-2020',
      sleep_start: '2am',
      sleep_end: '6am',
      total_time: 4,
      mood_score: 3,
      user_id: 3
    }

  ])
};
