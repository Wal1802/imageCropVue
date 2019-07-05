<template lang="html">
  <div>
    <crop-image 
    style="max-width:300px !important;     max-height: 300px !important;"
    classname="cropper"
    :src="img"
	:stencilProps="{
		aspectRatio: 8/5
	}"
	@change="change"/>
    <button @click="cropImageMethod">Crop me!</button>  
    <img v-if="imgCrop!=null" :src="imgCrop"/>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      img:
        "https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      imgCrop: null,
      dataCrop:null,
    };
  },
  methods: {
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas);
      this.dataCrop = coordinates;
    },
    cropImageMethod(/*imgObj, newWidth, newHeight, startX, startY, ratio */){
      /* the parameters: - the image element - the new width - the new height - 
        the x point we start taking pixels - the y point we start taking pixels - 
        the ratio */
        //set up canvas for thumbnail
        let x = this.dataCrop.left;
        let y = this.dataCrop.top;
        let imgObj = new Image();
        imgObj.setAttribute('crossOrigin', 'anonymous');
        imgObj.src= this.img;
        
        

        var tnCanvas = document.createElement('canvas');
        var tnCanvasContext = tnCanvas.getContext('2d');
        tnCanvas.width = this.dataCrop.width; 
        tnCanvas.height = this.dataCrop.height;
        tnCanvasContext.drawImage(imgObj, 0, 0);
        
        /* use the sourceCanvas to duplicate the entire image. 
        This step was crucial for iOS4 and under devices. 
        Follow the link at the end of this post to see what happens when you don’t do this */
        var bufferCanvas = document.createElement('canvas');
        var bufferContext = bufferCanvas.getContext('2d');
        bufferCanvas.width = imgObj.width;
        bufferCanvas.height = imgObj.height;
        bufferContext.drawImage(imgObj, 0, 0);
        
        /* now we use the drawImage method to take the pixels from our 
        bufferCanvas and draw them into our thumbnail canvas */
        tnCanvasContext.drawImage(bufferCanvas, x,y,this.dataCrop.width , this.dataCrop.height,0,0,this.dataCrop.width,this.dataCrop.height);
       debugger;
       this.imgCrop =  tnCanvas.toDataURL();
    }
  }
};
</script>

<style>
</style>
