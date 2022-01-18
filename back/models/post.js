module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define(
		'Post',
		{
			// db에는 posts 로 생성 (소문자, 복수형)
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci',
		},
	);
	Post.associate = db => {
		db.Post.belongsTo(db.User);
		db.Post.hasMany(db.Comment);
		db.Post.hasMany(db.Image);
		db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
		db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
		db.Post.belongsTo(db.Post, { as: 'Retweet' });
	};

	return Post;
};
