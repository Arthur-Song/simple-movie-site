/**
 * Created by Arthur on 2016/7/3.
 */
$(function(){
    $(".del").click(function(e){
        var target=$(e.target);
        var id=target.data("id");
        var tr=$(".item-id-"+id);
        $.ajax({
            type:"delete",
            url:"/admin/movie/list?id="+id
        }).done(function(result){
            if(result.success === 1){
                if(tr.length>0){
                    tr.remove();
                }
            }
        });
    });
});