# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|password|string|null: false|
|email|string|null: false|
### Association
- has_many :groups, though: users_groups
- has_many :messages

## Groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|strin|null: false|
### Association
- has_many :messages
- has_many :users, though: user_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
-belongs_to :user
-belongs_to :group

## users_membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belomgs_to :group       
