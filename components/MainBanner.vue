<template>
    <Flicking 
        ref="flicking"
        class="main_banner"
        :plugins="plugins"
        :options="{
            defaultIndex: 0,
            circular: true, 
            align:'center', 
            pagePerView: 3,
        }" 
        :hide-before-init="true"
        >
        <div 
            v-for="index in 5" 
            :key="index" 
            :class="`pannel pannel${index}`"
        >
            <!-- <div 
                class="door" 
                @click="setOpen(index)"
                :class="doorList[index-1] ? 'open' : 'close'"
            > -->
            <div 
                class="door" 
                @click="setOpen(index)"
                :class="doorList[index-1] ? 'open' : 'close'"
            >
                {{index}} {{ lorem[index-1] }}
            </div>
            <div class="backdoor" @click="setOpen(index)"></div>
            <div class="frame">

            </div>
        </div>
        <template #viewport>
            <div class="flicking-pagination"></div>
        </template>
    </Flicking>
</template>

<script setup>
    import gsap from 'gsap'
    import { Perspective, Pagination } from "@egjs/flicking-plugins";
    import Flicking from '@egjs/vue3-flicking';
    const plugins = [new Perspective({ rotate: 0.4 }), new Pagination({ type: 'bullet' })];
    const flicking = ref(null);
    const lorem = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis libero ac volutpat sodales. Vivamus faucibus quam vitae luctus pellentesque. Fusce auctor aliquet urna, sit amet dignissim orci tincidunt ac. Nullam mattis risus ut diam condimentum, cursus egestas tortor posuere. Mauris ut velit vel risus tempus suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin congue accumsan sapien et luctus.",
        "Nullam ut lorem quam. Integer in diam laoreet, pretium mi quis, placerat ante. Integer nec nunc id purus pretium consequat sit amet sit amet magna. Phasellus fringilla eros ac sollicitudin sollicitudin. Maecenas sagittis lectus ullamcorper volutpat aliquet. Ut maximus justo vitae vestibulum sodales. Mauris euismod ullamcorper erat eu varius. Aenean hendrerit neque at lectus facilisis euismod. Cras dignissim elit quis rhoncus vehicula.",
        "Pellentesque lectus leo, congue nec consequat vitae, iaculis sed ex. Mauris eget neque ante. Cras sed elementum erat. Curabitur pellentesque accumsan risus, sit amet sodales felis euismod facilisis. Integer a scelerisque ante. Aenean sed velit justo. Integer quis efficitur diam, nec aliquet ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean purus ligula, faucibus at dictum quis, commodo sagittis elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In sit amet lorem ut erat posuere posuere ut id sem. Sed tincidunt tortor id eros accumsan, nec tincidunt arcu posuere. Nulla in varius felis. Vivamus tempus fringilla arcu, sit amet congue dolor venenatis sed. Pellentesque consectetur erat a diam interdum lobortis. Pellentesque molestie est eu mattis ullamcorper.",
        "Duis rutrum condimentum facilisis. Etiam non eros blandit lectus facilisis fermentum at et augue. Vestibulum vestibulum, enim sit amet interdum molestie, leo nisi vulputate sapien, quis hendrerit lorem quam in urna. Nullam cursus dictum lectus ac dignissim. Curabitur libero nunc, vulputate ut mollis vel, venenatis nec erat. Cras tincidunt lorem ut turpis volutpat, quis sodales arcu aliquet. Maecenas purus ipsum, pulvinar sed porttitor vel, tristique quis libero. Quisque pulvinar ligula ac turpis rutrum scelerisque.",
        "Nullam in leo sem. Curabitur hendrerit est velit, ut aliquam elit pellentesque non. Suspendisse sit amet feugiat orci. Curabitur sollicitudin volutpat nisl. Nullam vitae congue justo, et vehicula massa. Aliquam maximus tortor sit amet mi iaculis sagittis. Nulla ut erat ac justo iaculis ullamcorper sit amet nec lectus. Nullam a velit quis ante elementum egestas. Duis posuere sit amet est nec vehicula. Nunc sed sagittis felis."
    ];
    const doorList = reactive([false, false, false, false, false,]);


    let timer = reactive(null);
    let clicks = reactive(0);
    let isOpen = reactive([false, false, false, false, false,]);
    
    const setOpen = (idx) => {
        clicks++;
        if (clicks === 1) {
            timer = setTimeout(() => {
                doorList[idx - 1] = !doorList[idx - 1];

                let startDeg = isOpen[idx-1] ? `-130deg_cw` : doorList[idx-1] ? `0deg` : `-40deg_cw`;
                let endDeg = isOpen[idx-1] ? `0deg_cw` : doorList[idx-1] ? `-40deg` : `0deg_cw`;

                gsap.fromTo(
                    `.pannel${idx} .door, .pannel${idx} .backdoor`,
                    {
                        transform: `perspective(2000px)`,
                        rotateY: startDeg
                    },
                    {
                        transform: `perspective(2000px)`,
                        rotateY: endDeg,
                        duration: 0.5,
                    }
                )    
                isOpen[idx - 1] = false;
                clicks = 0;
            }, 200);
        } else {
            clearTimeout(timer);
            const originValue = doorList[idx - 1];
            doorList[idx - 1] = true;
            isOpen[idx - 1] = true;
            gsap.fromTo(
                `.pannel${idx} .door, .pannel${idx} .backdoor`,
                {
                    transform: `perspective(2000px)`,
                    rotateY:`${originValue ? -40 : 0}deg_cw`
                },
                {
                    transform: `perspective(2000px)`,
                    rotateY: `-130deg_ccw`,
                    duration: 0.5,
                }
            )        
            clicks = 0;
        }
    }
</script>

<style lang="scss" scoped>
    .main_banner {
        padding: 50px 0;
        margin-top: 50px;
        .pannel {
            position: relative;
            width: 30%;
            height: 600px;
            &1{
                .door, .backdoor {
                    background-color: #666;
                }
                
                .frame {
                    border: 3px solid #666;
                    background-image: url("~/assets/sky.jpg");
                    background-position: 30%;
                    background-size: 800px;

                }
            }
            &2{
                .door, .backdoor {
                    background-color: #555;
                }
                .frame {
                    border: 3px solid #555;
                    background-image: url("~/assets/osaka.jpg");
                    background-position: 50%;
                    background-size: 500px;
                }
            }
            &3{
                .door, .backdoor {
                    background-color: #444;
                }
                .frame {
                    border: 3px solid #444;
                    background-image: url("~/assets/sunset.jpg");
                    background-position: 50%;
                    background-size: 450px;
                }
            }
            &4{
                .door, .backdoor {
                    background-color: #333;
                }
                .frame {
                    border: 3px solid #333;
                    background-image: url("~/assets/ocean.jpg");
                    background-position: 50%;
                    background-size: 350px;
                }
            }
            &5{
                .door, .backdoor {
                    background-color: #222;
                }
                .frame {
                    border: 3px solid #222;
                    background-image: url("~/assets/art.jpg");
                    background-position: 50%;
                    background-size: 450px;
                }
            }


            .door {
                backface-visibility: hidden;
                transform-origin: left center;
                padding: 10px 20px;
                color: #fff;
                font-size: 16px;
                z-index: 100;
                &:first-letter {
                    margin: -8px 2% -2px 0;
                    padding: 0 3% 0;
                    float: left;
                    font-size: 80px;
                    font-weight: bold;
                }                
            }
            .backdoor {
                transform-origin: left center;
                top: 0;
                left: 0;
            }
            .door, .frame, .backdoor {
                width: 100%;
                height: 100%;
                position: absolute;
            }
        }
    }
</style>