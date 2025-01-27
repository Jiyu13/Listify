import {Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Link, router} from "expo-router";
import FormButton from "@/components/buttons/FormButton";

export default function OnBoarding() {
    return (
        <SafeAreaView
            style={{backgroundColor: "#FFCA3A"}}
            className='flex h-full items-center justify-between'
        >
            <View className="flex h-full w-full items-center justify-center">
                <View className="flex items-center justify-center p-5">
                    <View className="flex flex-col items-center justify-center w-full mt-10">
                        <Text className="text-[#3e4e50] font-Barriecito mx-10 text-center text-7xl">
                            Listify
                        </Text>
                        <Text className="font-bold text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                            From To-Dos to Ta-Das!
                        </Text>
                    </View>

                </View>
                <View className="absolute bottom-10 flex justify-end">
                    <FormButton
                        buttonText='Get Started'
                        onPress={() => router.replace("/(auth)/sign-up")}
                        className="mt-10 p-4"
                    />
                    {/*<CustomButton*/}
                    {/*    title="Get Started"*/}
                    {/*    onPress={() => router.replace("/(auth)/sign-up")}*/}
                    {/*    className="w-11/12 mt-10"*/}

                    {/*/>*/}

                    <Link
                        href="/sign-in"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        <Text className="text-[#3e4e50] font-bold">I have an account</Text>
                    </Link>
                </View>


            </View>
            {/*<TouchableOpacity*/}
            {/*    onPress={() => {router.replace("/(auth)/sign-up")}}*/}
            {/*    className="w-full flex justify-end items-end p-5"*/}
            {/*>*/}
            {/*    <Text className="text-black text-md font-JakartaBold">Skip</Text>*/}
            {/*</TouchableOpacity>*/}

            {/*<Swiper*/}
            {/*    ref={swiperRef}*/}
            {/*    loop={false}*/}
            {/*    dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"/>}*/}
            {/*    activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />}*/}
            {/*    onIndexChanged={(index) => setActiveIndex(index)}*/}
            {/*>*/}
            {/*    {onboarding.map((item) => (*/}
            {/*        <View key={item.id} className="flex items-center justify-center p-5">*/}
            {/*            <Image*/}
            {/*                // source={item.image}*/}
            {/*                className="w-full h-[300px]"*/}
            {/*                resizeMode="contain"*/}
            {/*            />*/}
            {/*            <View className="flex flex-row items-center justify-center w-full mt-10">*/}
            {/*                <Text className="text-black text-3xl font-bold mx-10 text-center">*/}
            {/*                    {item.title}*/}
            {/*                </Text>*/}
            {/*            </View>*/}
            {/*            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">*/}
            {/*                {item.description}*/}
            {/*            </Text>*/}
            {/*        </View>*/}
            {/*    ))}*/}
            {/*</Swiper>*/}
            {/*<CustomButton*/}
            {/*    title={isLastSlides ? "Get Started" : "Next"}*/}
            {/*    onPress={() => isLastSlides ? router.replace("/(auth)/sign-up") : swiperRef.current?.scrollBy(1)}*/}
            {/*    className="w-11/12 mt-10"*/}
            {/*/>*/}
        </SafeAreaView>
    )
}
