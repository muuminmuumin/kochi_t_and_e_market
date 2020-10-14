$(document).on('turbolinks:load', ()=> {
  // プレビューBOX
  const imageBox = (thisIndex, url)=> {
    const html = 
    `<div class="UploadImageBox">
      <div class="UploadImageBox__image">
        <img data-index="${thisIndex}" src="${url}" alt="商品画像">
      </div>
      <div class="UploadImageBox__menu">
        <label for="image_${thisIndex}">編集</label>
        <div data-index="${thisIndex}" class="js-remove">削除</div>
      </div>
    </div>`;
    return html;
  }

  // 画像用のinputを生成する関数
  const newInputFile = (nextIndex)=> {
    const html = `<div data-index="${nextIndex}" class="js-file_group input_${nextIndex}">
                    <input class="js-file" type="file"
                    name="item[item_images_attributes][${nextIndex}][src]"
                    id="image_${nextIndex}"><br>
                  </div>`;
    return html;
  }

  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [];

  const image_box = '.imageSend__dropBox__list';

  // *** メソッド ***

  $(image_box).on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);

    } else {
      // 写真が5つ投稿されたら追加投稿フォームを非表示
      if($('.imageSend__dropBox__label').width() < 124) {
        $('.imageSend__dropBox__label').hide();
      }

      // fileIndexに初期値を追加
      if (fileIndex.length == 0) {
        fileIndex.push(targetIndex);
      }

      // // プレビューBOXを追加
      $(image_box).append(imageBox(targetIndex, blobUrl));

      // fileIndexをシフト
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
      fileIndex.shift();

      // 次のinputを追加
      $(image_box).append(newInputFile(fileIndex[0]));
      // labelのforを変更
      $('.imageSend__dropBox__label').attr('for', `image_${fileIndex[0]}`);
    }
  });

  $(image_box).on('click', '.js-remove', function() {
    if ($('.imageSend__dropBox__label').css('display') == 'none') {
      $('.imageSend__dropBox__label').show();
    }
    const targetIndex = $(this).data('index');
    // プレビューBOXとinputを削除
    $(this).parent().parent().remove(); // プレビューBOX
    $('.js-file_group' + `.input_${targetIndex}`).remove(); // input
    $(`#item_item_images_attributes_${targetIndex}_id`).remove(); // editで出現するinput要素

    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $(image_box).append(newInputFile(fileIndex[0]));
  });
});
