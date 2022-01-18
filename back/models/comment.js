module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		'Comment',
		{
			// db에는 comments 로 생성 (소문자, 복수형)
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
	Comment.associate = db => {
		db.Comment.belongsTo(db.User);
		db.Comment.belongsTo(db.Post);
	};

	return Comment;
};
