# Entity Relationship Diagram

Reference the Creating an Entity Relationship Diagram final project guide in the course portal for more information about how to complete this deliverable.

## Create the List of Tables

1) User
2) Movie
3) Watchlist
4) User_Movie

## Add the Entity Relationship Diagram

User 
| Column Name | Type | Description |
|-------------|------|-------------|
| id | integer | primary key |
| username | text | unique username |
| email | text | user email address |
| password | text | hashed password |

Movie
| Column Name | Type | Description |
|-------------|------|-------------|
| id | integer | primary key |
| title | text | movie title |
| release_year |	integer |	year of release |
| genre | text |	genre of the movie |
| director | text |	director’s name |
| duration |	integer	| duration in minutes |
| description	| text | 	brief summary of the movie |
| poster_url |	text |	link to movie poster image |

Watchlist
| Column Name | Type | Description |
|-------------|------|-------------|
| id | integer | primary key |
| user_id	| integer |	foreign key to User |
| movie_id | integer |	foreign key to Movie |
| added_date |	datetime |	date when the movie was added |
| watched	| boolean |	indicates if the user has watched it |

User_Movie
| Column Name | Type | Description |
|-------------|------|-------------|
| id | integer | primary key |
|user_id | integer |	foreign key to User |
| title	| text |	title of the user-added movie |
| url |	text	| URL for user reference |
| description |	text |	brief description |
| added_date |	datetime	| date when added to user’s library |

