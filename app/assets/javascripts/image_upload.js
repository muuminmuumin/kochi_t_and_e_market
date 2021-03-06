$(document).on('turbolinks:load', ()=> {
  // *** 手動設定変数 ***
  
  // 追加加増投稿ラベル
  const inputLabel = '.imageSend__dropBox__label';
  // 画像一覧表示エリア
  const image_box = '.imageSend__dropBox__list';

  // *** 自動設定変数 ***

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
                    id="image_${nextIndex}"
                    accept="image/*"><br>
                  </div>`;
    return html;
  }

  // 画像削除のinputを生成する関数
  const destroyInput = (thisIndex, targetValue) => {
    const html = `<input type="hidden" value="${targetValue}" name="item[item_images_attributes][${thisIndex}][_destroy]">`;
    return html;
  }

  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [];

  // *** 自動発火メソッド ***
  const hideInputLabel = () => {
    // 写真が5つ投稿されたら追加投稿フォームを非表示
    if($(inputLabel).width() < 124) {
      $(inputLabel).hide();
    }
  }
  hideInputLabel();

  // *** イベントメソッド ***

  $(image_box).on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    if (file != undefined) {
      const blobUrl = window.URL.createObjectURL(file);
  
      // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
      if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
          img.setAttribute('src', blobUrl);
  
      } else {
        hideInputLabel();
  
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
        $(inputLabel).attr('for', `image_${fileIndex[0]}`);
      } 
    }
  });

  $(image_box).on('click', '.js-remove', function() {
    if ($(inputLabel).css('display') == 'none') {
      $(inputLabel).show();
    }

    const targetIndex = $(this).data('index');
    const targetValue = $(`#item_item_images_attributes_${targetIndex}_id`).val();
    
    // プレビューBOXとinputを削除し、投稿済みの画像であれば_destroy inputを生成する
    $(this).parent().parent().remove(); // プレビューBOX
    $('.js-file_group' + `.input_${targetIndex}`).remove(); // input
    if (targetValue != null) {
      $(image_box).append(destroyInput(targetIndex, targetValue)); // _destroy input
    }
    
    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $(image_box).append(newInputFile(fileIndex[0]));
  });
});
