import { Select, SelectContent, SelectItem, SelectValue } from "@shared/ui/select"
import { SelectTrigger } from "@shared/ui/select"
import { ComponentProps } from "react"

interface LanguageSelectProps extends ComponentProps<typeof Select> {
	laguages_list: string[]
}

const LanguageSelect = ({ laguages_list, ...props }: LanguageSelectProps) => {
	return (
		<Select {...props}>
			<SelectTrigger className="w-[60px] border-none">
				<SelectValue placeholder="Ru" />
			</SelectTrigger>
			<SelectContent className="bg-main-bg">
				{laguages_list.map((language) => (
					<SelectItem className="text-white" value={language}>
					{language}
				</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export { LanguageSelect }
