<template>
    <div id="showVideo">
        <iframe style="height: 370px; width: 750px;" :src="'http://www.baidu.com?id=' + cameraId"></iframe>
    </div>
</template>

<script>
export default {
     props: [ 'cameraId' ]
}
</script>