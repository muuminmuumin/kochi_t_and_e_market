crumb :root do
  link "フリマ", root_path
end

crumb :mypage do
  link current_user.nick_name + "さん", user_path(current_user)
  parent :root
end

crumb :on_sale do
  link "出品中の商品",  on_sale_user_path(current_user)
  parent :mypage
end

crumb :purchase_history do
  link "購入した商品", user_purchase_histories_path(current_user)
  parent :mypage
end

crumb :profile do
  link "本人情報の変更",  edit_profile_path(current_user)
  parent :mypage
end

crumb :destination do
  link "お届け先住所の選択",  user_destinations_path(current_user)
  parent :mypage
end

crumb :destination_new do
  link "お届け先住所の登録",  new_destination_path
  parent :destination
end

crumb :destination_show do
  link "お届け先住所の詳細",  destination_path(params[:id])
  parent :destination
end

crumb :card do
  link "クレジットカード",  user_credit_cards_path(current_user)
  parent :mypage
end

crumb :card_new do
  link "クレジットカードの登録",  new_credit_card_path(current_user)
  parent :card
end


crumb :card_regist do
  link "クレジットカードの登録",  new_credit_card_path(current_user)
  parent :card
end

crumb :user_edit do
  link "メール/パスワードの変更", edit_user_registration_path
  parent :mypage
end

crumb :logout do
  link "ログアウト", logout_user_path(current_user)
  parent :mypage
end

crumb :item do |item|
  link item.name, item_path(item.id)
  parent :root
end

crumb :bookmark do
  link "お気に入り一覧", bookmark_user_path(current_user)
  parent :mypage
end

crumb :intro do |item|
  link item.user.nick_name, '#'
  parent :root
end

