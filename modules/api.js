const trakt = require("./trakt");
const extended = "full";
const showSelector = ({
  show: {
    title,
    year,
    ids: { trakt: id },
  },
}) => ({ title: title.replace("&amp;", "&"), year, id });

module.exports = {
  searchShow: async query => {
    const results = await trakt.search.text({ query, type: "show" });
    return results.map(showSelector);
  },
  getSeasons: async id => {
    const complete = await trakt.seasons.summary({
      id,
      id_type: "trakt",
      extended,
    });
    const filteredSeasons = complete.filter(({ number }) => !!number);

    const fetchSeasons = filteredSeasons.map(async season => {
      const episodes = await trakt.seasons.season({
        id,
        season: season.number,
        extended,
      });
      return { ...season, episodes };
    });

    const seasons = await Promise.all(fetchSeasons);
    return seasons;
  },
};
