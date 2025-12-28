import Button from '@/components/shared/buttons/button';
import DateInput from '@/components/shared/inputs/date-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';

export default function AddDetails({
    cameraData,
    setCameraData,
    handleJoinQuest,
    isJoined,
}: any) {
    const { t } = useLocales();

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 space-y-2 lg:grid-cols-2">
                <TextInput
                    label="Camera Brand"
                    placeholder="Enter your camera brand"
                    value={cameraData.camera_brand}
                    setValue={(val) =>
                        setCameraData({ ...cameraData, camera_brand: val })
                    }
                />
                <TextInput
                    label="Camera Model"
                    placeholder="Enter your camera model"
                    value={cameraData.camera_model}
                    setValue={(val) =>
                        setCameraData({ ...cameraData, camera_model: val })
                    }
                />
                <TextInput
                    label="Lens Model"
                    placeholder="Enter your lens model"
                    value={cameraData.lens}
                    setValue={(val) =>
                        setCameraData({ ...cameraData, lens: val })
                    }
                />
                <TextInput
                    label="Focal Length"
                    placeholder="Enter your focal length"
                    value={cameraData.focal_length}
                    setValue={(val) =>
                        setCameraData({ ...cameraData, focal_length: val })
                    }
                />
                <TextInput
                    label="Aperture"
                    placeholder="Enter your aperture"
                    value={cameraData.aperture}
                    setValue={(val) =>
                        setCameraData({ ...cameraData, aperture: val })
                    }
                />
                <TextInput
                    label="Shutter Speed"
                    placeholder="Enter your shutter speed"
                    value={cameraData.shutter_speed}
                    setValue={(val) =>
                        setCameraData({ ...cameraData, shutter_speed: val })
                    }
                />
                <TextInput
                    label="ISO"
                    placeholder="Enter your ISO"
                    value={cameraData.iso}
                    setValue={(val) =>
                        setCameraData({ ...cameraData, iso: val })
                    }
                />
                {/* <TextInput label='Date Captured' placeholder='Enter your date captured' value={cameraData.date_captured} setValue={(val) => setCameraData({ ...cameraData, date_captured: val })} /> */}
                <DateInput
                    value={cameraData.date_captured}
                    onChange={(val) =>
                        setCameraData({ ...cameraData, date_captured: val })
                    }
                    label="Date Captured"
                />
            </div>
            {cameraData.camera_brand &&
                cameraData.camera_model &&
                cameraData.lens &&
                cameraData.focal_length &&
                cameraData.aperture &&
                cameraData.shutter_speed &&
                cameraData.iso &&
                cameraData.date_captured && (
                    <Button
                        text={t(
                            isJoined
                                ? 'singleQuest.banner.addEntryText'
                                : 'singleQuest.banner.joinNowText',
                        )}
                        onClick={handleJoinQuest}
                        className="mx-auto mt-4 px-6 text-lg lg:px-14"
                    />
                )}
        </div>
    );
}
