import { forwardRef, useCallback } from "react";
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { cn } from "@/utils/cn";
import { Colors } from "@/components/theme";
import { BottomSheetProps } from "./BottomSheet.types";

const BottomSheet = forwardRef<GorhomBottomSheet, BottomSheetProps>(
  (
    {
      snapPoints = ["25%", "50%", "90%"],
      children,
      enablePanDownToClose = true,
      onIndexChange,
      style,
      className,
    },
    ref,
  ) => {
    // Custom backdrop render displaying semi-transparent overlay
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <GorhomBottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        onChange={onIndexChange}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: Colors.gray[300],
          width: 40,
        }}
        backgroundStyle={{
          backgroundColor: Colors.white,
          borderRadius: 24,
        }}
        style={style}
      >
        <BottomSheetView className={cn("flex-1 p-6 pb-10", className)}>
          {children}
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
