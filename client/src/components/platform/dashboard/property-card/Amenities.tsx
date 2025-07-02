interface AmenitiesProps {
  investmentGrade: string | number;
}

export default function Amenities({ investmentGrade }: AmenitiesProps) {
    return (
        <>
            <div className="px-6 py-4 border-t flex justify-end text-right">
                <div>
                    <span className="text-gray-500">Grado de inversión:</span>
                    <span className="font-semibold ml-2">{investmentGrade}</span>
                </div>
            </div>
        </>
    );
}
