const { Pool } = require('pg');

class PlaylistSongsService {
  constructor(playlistsService) {
    this._pool = new Pool();
    this._playlistsService = playlistsService;
  }

  async getSongsFromPlaylist(playlistId) {
    const playlist = await this._playlistsService.getPlaylistById(playlistId);

    const query = {
      text: `SELECT music.id, music.title, music.performer FROM playlist_songs
      INNER JOIN music ON music.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const { rows } = await this._pool.query(query);
    playlist.songs = rows;
    return { playlist };
  }
}

module.exports = PlaylistSongsService;
